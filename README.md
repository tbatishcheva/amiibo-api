https://www.amiiboapi.com/

E.g.
Head only: /api/amiibo/?head=01010000
Tail only: /api/amiibo/?tail=000e0002
Head + Tail: /api/amiibo/?id=01010000000e0002
https://www.amiiboapi.com/api/amiibo/?id=01010000000e0002&id=0000000000340102&id=0000000000000002


1) следить за асинхронностью вызовов
2) следить за тем чтобы бизнес-логика была только в редюсере 
3) делать как можно меньше умных компонентов и как можно больше глупых
4) следить за зависимостями хуков (например useEffect) - чтобы не было слишком много вызовов 
5) 

selects:
https://codepen.io/himalayasingh/pen/pxKKgd
https://codepen.io/miniven/pen/ZJydge
