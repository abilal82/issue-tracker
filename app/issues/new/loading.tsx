import { Box } from "@radix-ui/themes";
import {Skeleton} from '@/app/components'



const LoadingNewIssue = () => {

  return (
    <Box className="max-w-xl">
      <p>lodaing</p>
      <Skeleton />
      <Skeleton height='20rem'/>
    </Box>
  )
}

export default LoadingNewIssue