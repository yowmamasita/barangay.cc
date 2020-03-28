import React from "react"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import BarangayOfficials from "../components/barangay_officials"
import NotFound from "../components/not_found"

const IndexPage = () => {
  return (
    <Layout>
      <Router>
        <NotFound default />
        <BarangayOfficials path="/officials/:city/:barangay" />
      </Router>
    </Layout>
  )
}

export default IndexPage
