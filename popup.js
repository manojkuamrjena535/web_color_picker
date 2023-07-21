const btn = document.querySelector('.changeColorBtn');
const colorGrid= document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
const changeColorBtn= document.querySelector('.changeColorBtn');

btn.addEventListener('click',async()=>{
    let [tab] =await chrome.tabs.query({active: true,currentWindow: true});
    // console.log(tab);
    chrome.scripting.executeScript({
        target:{tabId: tab.id},
        function:pickColor

    },async (injectionResults)=>{
        const [data] = injectionResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            changeColorBtn.style.backgroundColor = color;
            colorValue.innerText = color + '  Code coppied.';
            // for auto copy of got color code
            try {
                await navigator.clipboard.writeText(color);
            } catch (error) {
                console.log(error);
            }
        }
                    console.log(injectionResults);
    });
});

async function pickColor(){
    console.log('script work');
    try {
        const eye = new EyeDropper();
        // const select = await eye.open();
        // console.log(select);
        return await eye.open();

    } catch (err) {
        console.log(err);
    }
};
