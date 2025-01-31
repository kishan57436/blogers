export const Routeindex='/'
export const RouteSign='/signin'
export const RouteSignup='/signup'
export const Routeprofile='/profile'

export const Routecategorydetails='/categories'
export const Routeaddcategory='/category/add'

export const Routeeditcategory = (category_id) => {
    if (category_id) {
        return `/category/edit/${category_id}`
    } else {
        console.log("second vale me aya hu");
        return `/category/edit/:category_id`
    }
}


// this way we fcan do this easily wihtout having any problem this way wwc ancs olvec the 
// if i do this way the day is not far i am able to solved the problem so easily wihtout having any problem this wya
// this way we can do it so easily without having any problem lets do it tis this way keep doing


export const RouteBlog = '/blog'
export const RouteBlogAdd = '/blog/add'
export const RouteBlogEdit = (blogid) => {
    if (blogid) {
        return `/blog/edit/${blogid}`
    } else {
        return `/blog/edit/:blogid`
    }
}
// this is the most imported thing we have done here  there is nothing othere we coudnt done it if we will see it in this way we could 
// get better than previous one this way we are here to told anyone wihtout having proepere distraction this 
export const RouteBlogDetails=(Category,blog)=>
    {
        if(!Category||!blog)
        {
            return `/blog/:category/:blog`
        }
        else{
            return `/blog/${Category}/${blog}`
        }
    
    }


    export const RouteBlogbycategory=(category)=>
    {
        if (!category) {
            return '/blog/:category'
        } else {
            return `/blog/${category}`
        }
    }


    export const Routesearch = (q) => {
        if (q) {
            return `/search?q=${q}`
        } else {
            return `/search`
        }
    }
    export const RouteCommentDetails = '/comments'
    export const RouteUser = '/users'