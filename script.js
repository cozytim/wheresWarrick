document.getElementById('walter').addEventListener('click', addwalt);
document.getElementById('warrick').addEventListener('click', addpoint);
let temp2 = 0;
      let temp = 0;
      var points = 0;
      var walt = 0;
      const wounter = document.getElementById('walt');
      const counter = document.getElementById('num');
      function addpoint(){
        temp ++;
        var add = points+temp;
        counter.textContent = String(add) ;
      }
      function addwalt(){
        temp2 ++;
        var addup = walt+temp2;
        wounter.textContent = String(addup) ;
      }
      let sp;
      function getClicks(){
        sp = setInterval(()=> sync(),5000);
      }
      async function walterdate(){
        try {
              const response = await fetch('https://never-forget-e68c721197c4.herokuapp.com/clickwalt', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ value: temp2 })
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              temp2 = 0; 
          } catch (error) {
              console.error('Error in update:', error);
          }
      }
      
      async function update() {
          try {
              const response = await fetch('https://never-forget-e68c721197c4.herokuapp.com/click', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ value: temp })
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              temp = 0; 
          } catch (error) {
              console.error('Error in update:', error);
          }
      }

      async function sync() {
        await update(); 
        try {
            const response = await fetch('https://never-forget-e68c721197c4.herokuapp.com/clicks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            points = Number(data.totalClicks); 
            counter.textContent = String(points); 
        } catch (error) {
            console.error('Error in sync:', error);
        }
        
        await walterdate(); 
        try {
            const response = await fetch('https://never-forget-e68c721197c4.herokuapp.com/clickswalt');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            walt = Number(data.totalClicks); 
            wounter.textContent = String(walt); 
        } catch (error) {
            console.error('Error in sync:', error);
        }
    }

    window.onload = getClicks();
