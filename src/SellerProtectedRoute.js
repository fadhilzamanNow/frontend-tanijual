import { Navigate } from "react-router-dom"

const SellerProtectedRoute = ({isSeller, children}) => {

    if(!isSeller){
        console.log("aman nih")
        return <Navigate to={`/`} replace />
    }

    return children
}

export default SellerProtectedRoute