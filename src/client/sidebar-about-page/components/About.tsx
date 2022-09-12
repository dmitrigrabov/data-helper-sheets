import { serverFunctions } from 'client/utils/serverFunctions'
import { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const About = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      serverFunctions
        .getContents()
        .then(contents => {
          console.log(contents)
        })
        .catch(e => {
          console.log('ERROR: ', e)
        })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <input
        type="button"
        className="button"
        value="Display toast"
        onClick={() => {
          serverFunctions
            .getContents()
            .then(contents => {
              console.log(contents)
            })
            .catch(e => {
              console.log('ERROR: ', e)
            })
        }}
      />
    </Container>
  )
}

export default About
