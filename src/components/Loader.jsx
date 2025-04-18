import { Spinner,Text } from "@chakra-ui/react"
export const Loader=()=>{
    return(
        <div className="flex flex-col justify-center items-center">
            <Text>Hold up!!</Text>
            <Spinner size='xl' />
        </div>
    )
}