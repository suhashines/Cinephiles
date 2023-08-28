function generateLabels(row, col) {
    const labels = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    for (let i = 0; i < row; i++) {
      for (let j = 1; j <= col; j++) {

        let cnt = Math.floor(Math.log(i)/Math.log(26));
        let str='';

        for(let k=0;k<cnt;k++){
            str = str+alphabet[k];
        }

        let label = str + alphabet[Math.floor(i % 26)] + j;
        labels.push(label);
      }
    }
  
    return labels;
  }
  
  