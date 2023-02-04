MOV 30h, #156
MOV 31h, #17

;sèítání
MOV A, 30h
ADD A, 31h
MOV 40h, A

;odèítání
MOV A, 30h
SUBB A, 31h
MOV 41h, A

;násobení
MOV A, 30h
MOV B, 31h
MUL AB
MOV 50h,B
MOV 51h,A

;dìlení
MOV A, 30h
MOV B, 31h
DIV AB
MOV 60h,A
MOV 61h,B