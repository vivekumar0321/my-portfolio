// src/components/analytics/VisitorTracker.jsx

import { useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from './../firebase/firestore';

const VisitorTracker = () => {
    useEffect(() => {
        const trackVisitor = async () => {
            try {
                // Generate Session ID (new for each visit)
                const sessionId = crypto.randomUUID();

                // Browser Information
                const userAgent = navigator.userAgent;

                let browser = "Unknown";

                if (userAgent.includes("Edg")) browser = "Edge";
                else if (userAgent.includes("Chrome")) browser = "Chrome";
                else if (userAgent.includes("Firefox")) browser = "Firefox";
                else if (userAgent.includes("Safari")) browser = "Safari";
                else if (userAgent.includes("Opera")) browser = "Opera";

                let os = "Unknown";

                if (userAgent.includes("Windows")) os = "Windows";
                else if (userAgent.includes("Mac")) os = "macOS";
                else if (userAgent.includes("Android")) os = "Android";
                else if (userAgent.includes("iPhone")) os = "iPhone";
                else if (userAgent.includes("Linux")) os = "Linux";

                const device =
                    /Mobi|Android|iPhone/i.test(userAgent)
                        ? "Mobile"
                        : "Desktop";

                // Screen
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;

                // Website
                const currentPage = window.location.pathname;
                const landingPage = window.location.href;
                const host = window.location.hostname;
                const language = navigator.language;
                const timezone =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;

                const referrer = document.referrer || "Direct";

                // Default values
                let ip = "";
                let country = "";
                let countryCode = "";
                let region = "";
                let city = "";
                let latitude = "";
                let longitude = "";
                let isp = "";
                let fullAddress = "";
                let postalCode = "";
                let streetName = "";
                let streetNumber = "";
                let dataSource = "Unknown";
                let permissionStatus = "Not Requested";
                let locationAccuracy = "";
                let locationType = "";

                const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
                

                // Step 1: Get user's IP using multiple sources
                const getIP = async () => {
                    const ipSources = [
                        // 'https://api.ipify.org?format=json',
                        // 'https://api.ip.sb/geoip',
                        'https://ipapi.co/json/'
                    ];

                    for (const source of ipSources) {
                        try {
                            const response = await fetch(source, {
                                mode: 'cors',
                                headers: {
                                    'Accept': 'application/json'
                                }
                            });
                            if (!response.ok) continue;
                            const data = await response.json();

                            if (data.ip) return data.ip;
                            if (data.query) return data.query;
                            if (data.ip_address) return data.ip_address;
                        } catch (e) {
                            console.log(`IP source ${source} failed:`, e);
                            continue;
                        }
                    }
                    return "";
                };

                // Step 2: Check and request permissions if needed
                const checkPermissions = async () => {
                    try {
                        if (!navigator.geolocation) {
                            permissionStatus = "Not Supported";
                            return false;
                        }

                        if (navigator.permissions && navigator.permissions.query) {
                            try {
                                const result = await navigator.permissions.query({ name: 'geolocation' });
                                permissionStatus = result.state;

                                if (result.state === 'granted') {
                                    return true;
                                } else if (result.state === 'denied') {
                                    return false;
                                } else if (result.state === 'prompt') {
                                    return true;
                                }
                            } catch (permError) {
                                console.log("Permission query not supported:", permError);
                                permissionStatus = "Unknown";
                            }
                        }

                        return true;
                    } catch (error) {
                        console.log("Permission check failed:", error);
                        return false;
                    }
                };

                // Step 3: Get IP address
                ip = await getIP();
                console.log("IP Address:", ip); 

                // Step 4: Get location data from multiple sources
                const getLocationData = async (ipAddress) => {
                    const locationSources = [
                        {
                            name: 'ipapi.co',
                            url: `https://ipapi.co/${ipAddress}/json/`,
                            parser: (data) => ({
                                latitude: data.latitude,
                                longitude: data.longitude,
                                country: data.country_name,
                                countryCode: data.country_code,
                                region: data.region,
                                city: data.city,
                                isp: data.org,
                                accuracy: data.accuracy || "City",
                                locationType: "IP Based"
                            })
                        },
                        {
                            name: 'ipwho.is',
                            url: `https://ipwho.is/${ipAddress}`,
                            parser: (data) => ({
                                latitude: data.latitude,
                                longitude: data.longitude,
                                country: data.country,
                                countryCode: data.country_code,
                                region: data.region,
                                city: data.city,
                                isp: data.connection?.isp,
                                accuracy: data.accuracy || "City",
                                locationType: "IP Based"
                            })
                        },
                        {
                            name: 'ip-api.com',
                            url: `http://ip-api.com/json/${ipAddress}`,
                            parser: (data) => ({
                                latitude: data.lat,
                                longitude: data.lon,
                                country: data.country,
                                countryCode: data.countryCode,
                                region: data.regionName,
                                city: data.city,
                                isp: data.isp,
                                accuracy: data.accuracy || "City",
                                locationType: "IP Based"
                            })
                        }
                    ];

                    for (const source of locationSources) {
                        try {
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), 5000);

                            const response = await fetch(source.url, {
                                mode: 'cors',
                                signal: controller.signal
                            });
                            clearTimeout(timeoutId);

                            if (!response.ok) continue;
                            const data = await response.json();

                            if (data && (data.latitude || data.lat)) {
                                const parsed = source.parser(data);
                                if (parsed.latitude && parsed.longitude) {
                                    console.log(`✅ Location found using ${source.name}`);
                                    return { ...parsed, source: source.name };
                                }
                            }
                        } catch (e) {
                            console.log(`❌ Location source ${source.name} failed:`, e);
                            continue;
                        }
                    }
                    return null;
                };

                // Step 5: Get location from IP
                if (ip) {
                    const locationData = await getLocationData(ip);
                    if (locationData) {
                        latitude = locationData.latitude;
                        longitude = locationData.longitude;
                        country = locationData.country || "";
                        countryCode = locationData.countryCode || "";
                        region = locationData.region || "";
                        city = locationData.city || "";
                        isp = locationData.isp || "";
                        dataSource = locationData.source;
                        locationAccuracy = locationData.accuracy || "City";
                        locationType = locationData.locationType || "IP Based";
                        permissionStatus = "Not Required (IP Based)";
                    }
                }

                // Step 6: Try HTML5 Geolocation if IP location failed
                if (!latitude || !longitude) {
                    console.log("IP location failed, trying HTML5 Geolocation");

                    const canUseGeolocation = await checkPermissions();

                    if (canUseGeolocation) {
                        try {
                            const position = await new Promise((resolve, reject) => {
                                navigator.geolocation.getCurrentPosition(
                                    resolve,
                                    reject,
                                    {
                                        timeout: 8000,
                                        enableHighAccuracy: true,
                                        maximumAge: 0
                                    }
                                );
                            });

                            if (position && position.coords) {
                                latitude = position.coords.latitude;
                                longitude = position.coords.longitude;
                                dataSource = "HTML5 Geolocation";
                                permissionStatus = "Granted";
                                locationAccuracy = position.coords.accuracy ? `${position.coords.accuracy}m` : "High";
                                locationType = "GPS";

                                console.log("✅ HTML5 Geolocation successful:", { latitude, longitude });
                            }
                        } catch (geoError) {
                            console.log("❌ HTML5 Geolocation error:", geoError);

                            if (geoError.code === 1) {
                                permissionStatus = "Denied";
                            } else if (geoError.code === 2) {
                                permissionStatus = "Unavailable";
                            } else if (geoError.code === 3) {
                                permissionStatus = "Timeout";
                            }
                        }
                    }
                }

                // Step 7: Get full address from Google Maps if we have coordinates
                if (latitude && longitude) {
                    console.log("Getting full address from Google Maps...");
                    try {
                        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}&result_type=street_address|route|intersection|political&language=en`;
                        const geocodeResponse = await fetch(geocodeUrl);
                        const geocodeData = await geocodeResponse.json();

                        console.log("Google Maps Response Status:", geocodeData.status);

                        if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
                            const result = geocodeData.results[0];

                            // Get full formatted address
                            fullAddress = result.formatted_address || "";

                            // Parse address components
                            const addressComponents = result.address_components;

                            addressComponents.forEach(component => {
                                const types = component.types;

                                if (types.includes("street_number")) {
                                    streetNumber = component.long_name;
                                }
                                if (types.includes("route")) {
                                    streetName = component.long_name;
                                }
                                if (types.includes("postal_code")) {
                                    postalCode = component.long_name;
                                }
                                if (types.includes("locality")) {
                                    city = component.long_name || city;
                                }
                                if (types.includes("administrative_area_level_1")) {
                                    region = component.long_name || region;
                                }
                                if (types.includes("country")) {
                                    country = component.long_name || country;
                                    countryCode = component.short_name || countryCode;
                                }
                            });

                            // Check if we got a street address
                            if (streetNumber && streetName) {
                                dataSource = `${dataSource} + Google Maps Geocoding (Street Level)`;
                            } else if (city && region) {
                                dataSource = `${dataSource} + Google Maps Geocoding (City Level)`;
                            } else {
                                dataSource = `${dataSource} + Google Maps Geocoding (General)`;
                            }

                            console.log("✅ Full address retrieved:", fullAddress);
                        } else if (geocodeData.status === "ZERO_RESULTS") {
                            console.log("No address found for these coordinates");
                        } else {
                            console.log("Google Maps Geocoding failed with status:", geocodeData.status);
                        }
                    } catch (geocodeError) {
                        console.log("❌ Google Maps Geocoding failed:", geocodeError);
                    }
                }

                // Log the data being saved
                console.log("📊 Saving visitor data:", {
                    sessionId,
                    ip,
                    location: { latitude, longitude, country, city },
                    address: fullAddress || "No address found",
                    dataSource,
                    permissionStatus,
                    locationAccuracy,
                    locationType
                });

                // Prepare data for Firebase
                const visitorData = {
                    session_id: sessionId,
                    visit_timestamp: serverTimestamp(),

                    // IP and Location
                    ip: ip || "Unknown",
                    country: country || "Unknown",
                    country_code: countryCode || "Unknown",
                    state: region || "Unknown",
                    city: city || "Unknown",
                    latitude: latitude ? latitude.toString() : "Unknown",
                    longitude: longitude ? longitude.toString() : "Unknown",
                    isp: isp || "Unknown",

                    // Full Address from Google Maps
                    full_address: fullAddress || "Not Available",
                    street_name: streetName || "Not Available",
                    street_number: streetNumber || "Not Available",
                    postal_code: postalCode || "Not Available",

                    // Location Metadata
                    data_source: dataSource || "Unknown",
                    permission_status: permissionStatus || "Unknown",
                    location_accuracy: locationAccuracy || "Unknown",
                    location_type: locationType || "Unknown",

                    // Browser Info
                    browser: browser || "Unknown",
                    os: os || "Unknown",
                    device: device || "Unknown",
                    user_agent: userAgent || "Unknown",

                    // Screen Info
                    screen_width: screenWidth || 0,
                    screen_height: screenHeight || 0,

                    // Website Info
                    language: language || "Unknown",
                    timezone: timezone || "Unknown",
                    referrer: referrer || "Unknown",
                    landing_page: landingPage || "Unknown",
                    current_page: currentPage || "Unknown",
                    host: host || "Unknown",

                    // Visit counter
                    visit_count: 1,

                    created_at: serverTimestamp(),
                    updated_at: serverTimestamp(),
                };

                // Save to Firebase
                await addDoc(collection(db, "visitors"), visitorData);

                console.log("✅ Visitor data saved successfully for session:", sessionId);

            } catch (error) {
                console.error("❌ Visitor Tracking Error:", error);
                // Fallback save
                try {
                    await addDoc(collection(db, "visitors"), {
                        session_id: crypto.randomUUID(),
                        error: error.message,
                        created_at: serverTimestamp(),
                        browser: navigator.userAgent,
                        permission_status: "Error",
                        error_occurred: true
                    });
                    console.log("✅ Fallback data saved");
                } catch (fallbackError) {
                    console.error("❌ Even fallback save failed:", fallbackError);
                }
            }
        };

        trackVisitor();
    }, []);

    return null;
};

export default VisitorTracker;