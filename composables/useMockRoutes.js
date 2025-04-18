const addresses = [
    {
        straat: 'Damrak',
        nummer: '1',
        woonplaats: 'Amsterdam',
        postcode: '1012 LG',
        lat: 52.37403,
        lng: 4.89363
    },
    {
        straat: 'Coolsingel',
        nummer: '105',
        woonplaats: 'Rotterdam',
        postcode: '3012 AG',
        lat: 51.9225,
        lng: 4.47917
    },
    {
        straat: 'Lange Poten',
        nummer: '4',
        woonplaats: 'Den Haag',
        postcode: '2511 CL',
        lat: 52.07866,
        lng: 4.31345
    },
    {
        straat: 'Oude Gracht',
        nummer: '245',
        woonplaats: 'Utrecht',
        postcode: '3511 NL',
        lat: 52.09074,
        lng: 5.12142
    },
    {
        straat: 'Stationsplein',
        nummer: '10',
        woonplaats: 'Eindhoven',
        postcode: '5611 AB',
        lat: 51.44083,
        lng: 5.47778
    },
    {
        straat: 'Grote Markt',
        nummer: '1',
        woonplaats: 'Groningen',
        postcode: '9712 HN',
        lat: 53.21917,
        lng: 6.56667
    },
    {
        straat: 'Vrijthof',
        nummer: '10',
        woonplaats: 'Maastricht',
        postcode: '6211 LE',
        lat: 50.84833,
        lng: 5.68889
    },
    {
        straat: 'Markt',
        nummer: '1',
        woonplaats: 'Delft',
        postcode: '2611 GP',
        lat: 52.01157,
        lng: 4.35707
    },
    {
        straat: 'Waagplein',
        nummer: '2',
        woonplaats: 'Alkmaar',
        postcode: '1811 JP',
        lat: 52.63238,
        lng: 4.74863
    },
    {
        straat: 'Meent',
        nummer: '78',
        woonplaats: 'Rotterdam',
        postcode: '3011 JM',
        lat: 51.92224,
        lng: 4.47986
    }
]


const getRandomAdresses = (count) => {
    const shuffled = [...addresses].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(count, addresses.length))
}

const mockRoutes = [
    { id: 1, name: 'Route 1', vehicle: 'Vrachtwagen A', date: new Date('2025-04-20'), addresses: getRandomAdresses(13) },
    { id: 2, name: 'Route 2', vehicle: 'Vrachtwagen B', date: new Date('2025-04-20'), addresses: getRandomAdresses(12) },
    { id: 3, name: 'Route 3', vehicle: 'Vrachtwagen C', date: new Date('2025-04-20'), addresses: getRandomAdresses(14) },
    { id: 4, name: 'Route 4', vehicle: 'Vrachtwagen A', date: new Date('2025-04-21'), addresses: getRandomAdresses(15) },
    { id: 5, name: 'Route 5', vehicle: 'Vrachtwagen B', date: new Date('2025-04-21'), addresses: getRandomAdresses(11) },
    { id: 6, name: 'Route 6', vehicle: 'Vrachtwagen C', date: new Date('2025-04-21'), addresses: getRandomAdresses(10) },
    { id: 7, name: 'Route 7', vehicle: 'Vrachtwagen A', date: new Date('2025-04-22'), addresses: getRandomAdresses(13) },
    { id: 8, name: 'Route 8', vehicle: 'Vrachtwagen B', date: new Date('2025-04-22'), addresses: getRandomAdresses(12) },
    { id: 9, name: 'Route 9', vehicle: 'Vrachtwagen C', date: new Date('2025-04-22'), addresses: getRandomAdresses(14) },
    { id: 10, name: 'Route 10', vehicle: 'Vrachtwagen A', date: new Date('2025-04-23'), addresses: getRandomAdresses(15) },
    { id: 11, name: 'Route 11', vehicle: 'Vrachtwagen B', date: new Date('2025-04-23'), addresses: getRandomAdresses(11) },
    { id: 12, name: 'Route 12', vehicle: 'Vrachtwagen C', date: new Date('2025-05-23'), addresses: getRandomAdresses(10) },
    { id: 13, name: 'Route 13', vehicle: 'Vrachtwagen A', date: new Date('2025-05-24'), addresses: getRandomAdresses(13) },
    { id: 14, name: 'Route 14', vehicle: 'Vrachtwagen B', date: new Date('2025-05-24'), addresses: getRandomAdresses(12) },
    { id: 15, name: 'Route 15', vehicle: 'Vrachtwagen C', date: new Date('2025-05-24'), addresses: getRandomAdresses(14) },
    { id: 16, name: 'Route 16', vehicle: 'Vrachtwagen A', date: new Date('2025-05-25'), addresses: getRandomAdresses(15) },
    { id: 17, name: 'Route 17', vehicle: 'Vrachtwagen B', date: new Date('2025-05-25'), addresses: getRandomAdresses(11) },
    { id: 18, name: 'Route 18', vehicle: 'Vrachtwagen C', date: new Date('2025-05-25'), addresses: getRandomAdresses(10) },
    { id: 19, name: 'Route 19', vehicle: 'Vrachtwagen A', date: new Date('2025-05-26'), addresses: getRandomAdresses(13) },
    { id: 20, name: 'Route 20', vehicle: 'Vrachtwagen B', date: new Date('2025-05-26'), addresses: getRandomAdresses(12) }
];

export const useMockRoutes = () => mockRoutes

export const getMockRouteById = (id) => mockRoutes.find(route => route.id === Number(id))