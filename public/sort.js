function sortTable(n,direction) { 
    var table; 
    table = document.getElementById("table"); 
    var rows, i, x, y, count = 0; 
    var switching = true; 

    while (switching) { 
        switching = false; 
        var rows = table.rows; 

        for (i = 1; i < (rows.length - 1); i++) { 
            var Switch = false; 

            x = rows[i].getElementsByTagName("TD")[n]; 
            y = rows[i + 1].getElementsByTagName("TD")[n]; 

            var a = x.innerHTML.toLowerCase()
            var b = y.innerHTML.toLowerCase()
        
        if(n===5) {
            
            if(a==='high'){a=3}
           
            if(b==='high'){b=3}
            
            if(a==='medium'){a=2}
            
            if(b==='medium'){b=2}
            
            if(a==='low'){a=1}
            
            if(b==='low'){b=1}
        }
        
        if (direction == "ascending") { 
                if (a > b) 
                {   Switch = true; 
                    break; }
            } else if (direction == "descending") { 

                if (a < b) 
                {  Switch = true; 
                    break; } 
            } 
        } 
        if (Switch) { 
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
            switching = true; 
            count++; 

        } else { 
            if (count == 0) { 
                switching = true; 
            } 
        } 
    } 
} 


