export const loginElements = [
    { type: "text", name: "username", label: 'Username', variant: "outlined", required: true, margin: "normal", fullWidth: true, 
    inputProps: { style: { color: "#fff",padding:"8px" } }, InputLabelProps: { style: { color: '#fff'} } },
    { type: "password", name: "password", label: 'Password', variant: "outlined", required: true, margin: "normal", fullWidth: true, 
    inputProps: { style: { color: "#fff",padding:"8px"  } }, InputLabelProps: { style: { color: '#fff' } }}
]


export const TransactionElement = [
    {
        name: "referenceNum", label: "Reference Number", margin: "dense",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 12, size: "small",
    },
    {
        name: "customerName", label: "Customer Name", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 6, sm: 6
    },
    {
        name: "customerNumber", label: "Customer Number", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 6, sm: 6
    },

    {
        name: "customerAddress", label: "Customer Address", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6, multiline: true
    },
    {
        name: "phoneNumber", label: "Phone Number", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },

    {
        name: "transferAmount", label: "Transfer Amount", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },
    {
        name: "transferCurrency", label: "Transfer Currency", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },

    {
        name: "beneficiaryBank", label: "Beneficiary Bank", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },
    {
        name: "beneficiaryAccnum", label: "Beneficiary Account Number", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },
    {
        name: "paymentDetails", label: "Payment details", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },
    {
        name: "cardDetails", label: "Credit/Debit Card Details", margin: "dense", size: "small",
        variant: "outlined", fullWidth: true, required: true, xs: 12, sm: 6
    },



]
