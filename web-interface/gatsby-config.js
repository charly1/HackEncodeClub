require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
              name: 'Zucchini DApp',
              short_name: 'Zucchini',
              start_url: '/',
              icon: 'src/images/zucchini.png',
            },
        },
    ]
}