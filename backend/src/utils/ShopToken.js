
// create seller  token and saving in cookies 

const sendShopToken = (seller,statuscode,res)=>{
    const token = seller.getJwtToken();

    //options for cookies
    const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    };

    res.status(statuscode).cookie("seller_token", token,options).json({
        success:true,
        seller,
        token,

    });
};

module.exports = sendShopToken