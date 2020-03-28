import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import BarangaySearch from "../components/barangay_search"

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

  return (
    <Layout>
      <SEO title="Search" />
      <h1>{data.site.siteMetadata.description}</h1>
      <p>Get started by searching for your barangay name</p>
      <BarangaySearch />
    </Layout>
  )
}

export default IndexPage
