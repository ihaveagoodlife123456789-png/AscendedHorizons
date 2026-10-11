import {Shippo} from "shippo"

const shippo = new Shippo({apiKeyHeader: 'shippo_live_6c3b8a0b9cfafa52abc899689edf578f570b79f6'})
const addressFrom = {
    name: "Shawn Ippotle",
    street1: "215 Clayton St.",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "US"
};

const addressTo = {
    name: "Mr Hippo",
    street1: "Broadway 1",
    city: "New York",
    state: "NY",
    zip: "10007",
    country: "US",
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

const bestRate = Math.min(Number(rates.amount))

const transaction = await shippo.transactions.create({
    rate: bestRate?.objectId
})

console.log(transaction)

//process.env.SHIPPO_TEST_KEY