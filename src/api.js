import algoliasearch from "algoliasearch"

const appID = "KH8O7Q6ECH"
const searchKey = "fee192f26682f8cb468b384c1a95611b"

const client = algoliasearch(appID, searchKey)
export const searchApi = client.initIndex("barangay_officials")
