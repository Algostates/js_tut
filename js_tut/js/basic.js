// basic js


// ways to make variables

// let doSomething__btn = document.querySelector('button#get_result');

// console.log(doSomething__btn);
class ABC{
    constructor(){}
}
class DEF{
    constructor(){}
}


function doBasic(){
    
    let abc = new ABC();
    let def = new DEF();
    try{
        var x = 6;
        let y = '6';
        let longStr = 'Lorem ipsum \
        dolor sit amet consectetur adipisicing elit. \
        Provident ut, beatae inventore sapiente assumenda eius \
        a non natus magni temporibus earum excepturi, ullam \
        nostrum soluta est. Consectetur vero sint iure.',
        longStr2 = `Lorem ipsum 
        dolor sit amet consectetur adipisicing elit. 
        Provident ut, beatae inventore sapiente assumenda eius 
        a non natus magni temporibus earum excepturi, ullam 
        nostrum soluta est. Consectetur vero sint iure.`,
        obj = {
            str1: longStr.replace(/\s\s*/g, ' '),
            str2: longStr2.replace(/\s\s*/g, ' ')
        };
        obj.len1 = obj.str1.length;
        obj.len2 = obj.str2.length;
        console.log(obj)
        let str = `The first <View> wrapper will be the background of our modal. We need this so we can set the color and opacity to whatever we want. The next <View> will be the white background with rounded corners to our ActivityIndicator.
        Of course, we need to include the styles for this markup, and we’ll end up with a finished loader.js file that looks something like this.
        In the stylesheet, you can see the background uses flex box to center the inner view on the screen, and uses the background color black (#000000) with opacity at 40% (#00000040).
        The ActivityIndicator wrapper background will be a 100x100 square with rounded corners and a white background. It also uses flex box to center the ActivityIndicator within it.
        Now, as lon+g as lo+ading state is set to true in our container component, we can refresh (or take advantage of hot reload), and see the modal and indicator with styles applied.`;

        let rexp = /(?=.*)\.(?=\n)/gm, allMatches = str.match(rexp);
        //console.log('rexp:', typeof rexp, rexp instanceof RegExp);
        console.log(allMatches);

        console.log(typeof y)
        y = +y;
        console.log(typeof y)
        y = {v:3}
        console.log(typeof y)
        {
            let z = 10;
            var zz = 11;
            console.log(z)
            console.log(zz)
        }
    
        //console.log(z)
        console.log(4=='4', 4==='4')
        console.log(abc instanceof ABC, def instanceof ABC)
        console.log(abc instanceof DEF, def instanceof DEF)
        
        let arr = [];
        console.log(arr instanceof Array)

        tryErr()
        console.log(zz)
    }catch(e){
        console.log(e)
    }
    console.log('Not \
    Crashed.');
}

function tryErr(){
    if(true){
        console.trace('Tracing.....')
    }
        
}