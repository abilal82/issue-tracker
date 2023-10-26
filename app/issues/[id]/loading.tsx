import { Box, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import {Skeleton} from '@/app/components'


const LoadingIssueDetail = async () => {
  return (
   
    <Grid columns={{ initial: "1", md: "2" }}>
     <Box className='max-w-xl'>
        <Heading>
          <Skeleton/>
        </Heading>
        <Flex gap="3" my='2'>
          <Skeleton width='5rem'/>
          <Skeleton width='8rem'/>
        </Flex>
        <Card  mt='4'>
          <Skeleton count={3}/>
        </Card>
    </Box>
    <Box>
      <Skeleton count={1} height='2rem' width='6rem'/>
    </Box>
  </Grid>
    // <div><p> 🌀Loading...</p></div>
  )
}

export default LoadingIssueDetail