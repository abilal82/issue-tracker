import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const LoadingIssueDetail = async () => {
  return (
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
    // <div><p> 🌀Loading...</p></div>
  )
}

export default LoadingIssueDetail