require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        // {
        //     resolve: `gatsby-plugin-sharp`,
        //     options: {
        //         icon: 'src/images/icon.png',
        //     },
        //   },
    ]
}