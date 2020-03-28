import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import OfficialsList from "../components/officials_list"
import { Heading } from "@chakra-ui/core"

const IndexPage = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const barangay = urlParams.get("barangay")
  const city = urlParams.get("city")

  return (
    <Layout>
      <SEO title="Officials" />
      <Heading>
        Officials of {barangay}, {city}
      </Heading>
      <OfficialsList />
    </Layout>
  )
}

export default IndexPage
