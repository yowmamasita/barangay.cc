import React, { useState } from "react"
import { Input, List, ListItem } from "@chakra-ui/core"
import { Link } from "gatsby"
import { debounce } from "../support"
import { searchApi } from "../api"

const BarangaySearch = () => {
  const [results, setResults] = useState([])
  const debounceMs = 450
  const searchForBarangay = debounce(v => {
    searchApi
      .search(v, {
        facetFilters: [["POSITION: Punong Barangay"]],
      })
      .then(({ hits }) => {
        setResults(hits)
      })
      .catch(err => {
        console.log(err)
      })
  }, debounceMs)
  const search = e => searchForBarangay(e.target.value)

  return (
    <>
      <Input
        placeholder="Type your barangay, city, municipality, province, region"
        size="lg"
        onChange={search}
        marginBottom={25}
      />
      <List>
        {results.map((barangay, i) => (
          <ListItem key={i}>
            {barangay.BARANGAY}, {barangay.CITY_MUNICIPALITY} -{" "}
            <Link
              to={`/officials/${barangay.CITY_MUNICIPALITY}/${barangay.BARANGAY}`}
            >
              View officials
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default BarangaySearch
