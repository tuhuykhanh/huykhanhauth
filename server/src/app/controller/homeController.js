
const homeController = {

    getHome: async(req,res,next)=>{
            try {

                res.send('home page')

            } catch (error) {

            }
    }

}
module.exports = homeController;