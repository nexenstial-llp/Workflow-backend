
export const cookieToken=(user,res,message)=>{
    const token=user.getJwtToken();

    const options={
        expires:new Date(
            Date.now()+ 24*60*60*1000
        ),
        httpOnly:true
    }
    user.password=undefined
    res.status(200).cookie('token',token,options).json({
        success:true,
        message:message,
        token,
        user
    })
}