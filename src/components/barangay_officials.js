import React, { useState, useEffect } from "react"
import { searchApi } from "../api"
import { sortBy, compose, prop, toLower, uniq, filter } from "ramda"
import { List, ListItem, Tag, Text, Stack, Heading } from "@chakra-ui/core"
import SEO from "./seo"
import { utf8 } from "../support"

const BarangayOfficials = ({ barangay, city }) => {
  const [officials, setOfficials] = useState([])
  const [details, setDetails] = useState({})

  const sortByPosition = sortBy(compose(toLower, prop("POSITION")))

  useEffect(() => {
    searchApi
      .search("", {
        facetFilters: [[`BARANGAY:${barangay}`], [`CITY_MUNICIPALITY:${city}`]],
      })
      .then(({ hits }) => {
        const okHits = filter(v => true, hits)
        setOfficials(sortByPosition(okHits))
        setDetails({
          region: okHits[0]["REGION"],
          province: okHits[0]["PROVINCE"],
          tel_no: uniq(
            filter(
              v => v.length > 4,
              okHits.map(e => e.BARANGAY_HALL_TELNO)
            )
          ),
        })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <SEO title={`Officials of ${barangay}, ${city}`} />
      <Heading>
        Officials of {barangay}, {city}
      </Heading>
      <Stack>
        <Text>Region: {details.region}</Text>
        <Text>Province: {details.province}</Text>
        <Text>
          Contact:{" "}
          {details.tel_no && details.tel_no.length > 0 ? (
            <>
              {details.tel_no.join(", ")}{" "}
              <sup>
                <a target="_blank" href="https://pldthome.com/updateto8">
                  Not working?
                </a>
              </sup>
            </>
          ) : (
            "None provided"
          )}{" "}
        </Text>
      </Stack>
      <List>
        {officials.map((official, i) => (
          <ListItem key={i}>
            {official.POSITION}: {utf8(official.FIRSTNAME)}{" "}
            {utf8(official.MIDDLENAME)} {utf8(official.LASTNAME)}{" "}
            {utf8(official.SUFFIX)}{" "}
            {official.EMAIL_ADDRESS && (
              <Tag>{toLower(official.EMAIL_ADDRESS)}</Tag>
            )}
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default BarangayOfficials
