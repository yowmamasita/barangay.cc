import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Input, List, ListItem, Divider } from "@chakra-ui/core"
import { useStaticQuery, graphql, Link } from "gatsby"
import { debounce } from "../support"
import algoliasearch from "algoliasearch"
import { groupBy, keys } from "ramda"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteDescriptionQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  const [results, setResults] = useState([])

  const appID = "KH8O7Q6ECH"
  const searchKey = "fee192f26682f8cb468b384c1a95611b"
  const client = algoliasearch(appID, searchKey)
  const index = client.initIndex("barangay_officials")

  const debounceMs = 450
  const search = debounce(v => {
    index
      .search(v)
      .then(({ hits }) => {
        const byBarangay = groupBy(
          item => `${item.BARANGAY}, ${item.CITY_MUNICIPALITY}`
        )
        setResults(keys(byBarangay(hits)))
      })
      .catch(err => {
        console.log(err)
      })
  }, debounceMs)
  const searchForBarangay = e => {
    search(e.target.value)
  }
  return (
    <Layout>
      <SEO title="Search" />
      <h1>{data.site.siteMetadata.description}</h1>
      <p>Get started by searching for your barangay name</p>
      <Input
        placeholder="Type your barangay, city, municipality, province, region"
        size="lg"
        onChange={searchForBarangay}
        marginBottom={25}
      />
      <List styleType="disc">
        {results.map((barangay, i) => (
          <ListItem key={i}>
            {barangay} -{" "}
            <Link to={`/officials?barangay=${barangay}`}>View officials</Link>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default IndexPage
