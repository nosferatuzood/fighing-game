const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity =0.2

class sprite{
    constructor({position,velocity}){
        this.position=position    
        this.velocity=velocity
        this.height=150
        this.lastkey
    }


    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,50,this.height)
    }

    update(){
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height ) {
            this.velocity.y=0
        }else this.velocity.y += gravity
    }
    
}

const player =new sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    }
})
   


const enemy =new sprite({
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    }
})

console.log(player)
const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    }
}
let lastkey

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x=0
    enemy.velocity.x=0

    //player movement
    if (keys.a.pressed && player.lastkey==='a'){
        player.velocity.x =-1
    }else if(keys.d.pressed &&player.lastkey==='d'){
        player.velocity.x =1
    }
//enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x =-1
    }else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x =1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key){
        case 'd':
            keys.d.pressed=true
            player.lastkey ='d'
        break
        case 'a':
         keys.a.pressed=true
         player.lastkey='a'
        break
        case 'w':
         player.velocity.y=-10
        break
//enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastkey='ArrowRight'
        break
        case 'ArrowLeft':
         keys.ArrowLeft.pressed=true
         enemy.lastkey='ArrowLeft'
        break
        case 'ArrowUp':
         enemy.velocity.y=-10
        break
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed=false

        break
        case 'a':
          keys.a.pressed=false
        break
        case 'w':
         keys.w.pressed=false
         lastkey='w'
        break
//enemy keys

        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            enemy.lastkey ='ArrowRight'
        break
        case 'ArrowLeft':
         keys.ArrowLeft.pressed=false
         enemy.lastkey='ArrowLeft'
        break
        case 'ArrowUp':
         enemy.velocity.y=-10
        break
    }
    console.log(event.key);
})
