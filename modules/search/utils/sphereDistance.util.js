const convertDegreeToRadian = (deg) => {
    return deg * (Math.PI / 180)
}

export const calculateDistance = (point1, point2) => {
    const EARTH_RADIUS = 6371; //km
    const dLat = convertDegreeToRadian(point2.lat - point1.lat);
    const dLon = convertDegreeToRadian(point2.lng - point2.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(convertDegreeToRadian(point1.lat)) * Math.cos(convertDegreeToRadian(point2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = EARTH_RADIUS * c; // Distance between two points in kilometers
    return d;
}
