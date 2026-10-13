import {Shippo} from "shippo"

const shippo = new Shippo({apiKeyHeader: 'shippo_test_5fe9ac57d4e0e42b5a888ef602552b1c2d7ec327' })

const addressFrom = {
    name: "Montrealer",
    street1: "Rue Saint-Jacques",
    city: "Montreal",
    state: "QC",
    zip: "H3C1A3",
    country: "CA"
};

const addressTo = {
    name: "Bob",
    street1: "Sainte-Catherine Street",
    city: "Montreal",
    state: "QC",
    zip: "H3B1B2",
    country: "CA"
};

const parcel = {
    length: "5",
    width: "5",
    height: "5",
    distanceUnit: "cm",
    weight: "2",
    massUnit: "kg"
};

const parcel2 = {
    length: "10",
    width: "10",
    height: "10",
    distanceUnit: "cm",
    weight: "2",
    massUnit: "kg"
};

const shipment = await shippo.shipments.create({
    addressFrom: addressFrom,
    addressTo: addressTo,
    parcels: [parcel],
    async: false
});

console.log(shipment)

const rates = shipment.rates

const mapRates = rates.map((rate) => Number(rate.amount))

const bestRate = Math.min(...mapRates)

console.log(bestRate)

const bestRateObject = rates.find((rate) => rate.amount = bestRate.toString())

const transaction = await shippo.transactions.create({
    rate: bestRateObject?.objectId
})

console.log(transaction)

/*const getShippo = await shippo.shipments.get('9c8ba1127a6b44889bd1bb7fad860c2a')
console.log(getShippo)*/

//Shippo refunds
//https://docs.goshippo.com/api-reference

//process.env.SHIPPO_TEST_KEY