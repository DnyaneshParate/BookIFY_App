
let orderConfirmation = document.getElementById("orderConfirm");


const ConfirmOrder = (val) =>{
    if(val === "YES")
    {
        orderConfirmation.innerText = "Order Confirmed ✅";   
        return true;                  
    }
    orderConfirmation.innerText = "Order Cancelled ❌";
    return false;
}

export default ConfirmOrder;