import {Shippo} from "shippo"

const shippo = new Shippo({apiKeyHeader: process.env.SHIPPO_TEST_KEY })
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

const rate = shipment.rates[0]

const transaction = await shippo.transactions.create({
    rate: rate?.objectId
})

console.log(transaction)

//process.env.SHIPPO_TEST_KEY