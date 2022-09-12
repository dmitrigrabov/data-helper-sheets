import { serverFunctions } from 'client/utils/serverFunctions'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const About = () => (
  <Container>
    <input
      type="button"
      className="button"
      value="Display toast"
      onClick={() => serverFunctions.displayToast()}
    />
  </Container>
)

export default About
