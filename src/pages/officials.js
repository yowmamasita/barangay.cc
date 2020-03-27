import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { List, ListItem, Tag } from "@chakra-ui/core"
import algoliasearch from "algoliasearch"
import { toLower, sortBy, compose, prop, concat } from "ramda"

const IndexPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const barangayName = urlParams.get("barangay")

  const [officials, setOfficials] = useState([])

  const appID = "KH8O7Q6ECH"
  const searchKey = "fee192f26682f8cb468b384c1a95611b"
  const client = algoliasearch(appID, searchKey)
  const index = client.initIndex("barangay_officials")

  const sortByPosition = sortBy(compose(toLower, prop("POSITION")))

  useEffect(() => {
    index
      .search(barangayName)
      .then(({ hits }) => {
        setOfficials(sortByPosition(hits))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <SEO title="Officials" />
      <h1>Officials of {barangayName}</h1>
      <List styleType="disc">
        {officials.map((official, i) => (
          <ListItem key={i}>
            {official.POSITION}: {official.FIRSTNAME} {official.MIDDLENAME}{" "}
            {official.LASTNAME} {official.SUFFIX}{" "}
            {official.EMAIL_ADDRESS && (
              <Tag>{toLower(official.EMAIL_ADDRESS)}</Tag>
            )}
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default IndexPage
