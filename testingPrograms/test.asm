;Sestavte program, který tøikrát odpísmenkuje slovo AFrOdItA 
;(AFRODITA) a poté zobrazí pøi držení tlaèítka písmeno, 
;jehož poøadí ve slovì (poèítáno od 0) odpovídá èíslu tlaèítka.
MOV R3,#3
MOV 38h,#255

cyklus:
MOV 30h,#10001000b ;A
MOV 31h,#10001110b ;f
MOV 32h,#10101111b ;r
MOV 33h,#11000000b ;O
MOV 34h,#10100001b ;d
MOV 35h,#11001111b ;i
MOV 36h,#10000111b ;t
MOV 37h,#10001000b ;A

MOV R4, #8
MOV R0, #30h

toc:
MOV P1, @R0
INC R0
DJNZ R4, toc

MOV P1, 38h
DJNZ R3, cyklus

;A
hledej: 
JB P2.0, acko 
MOV P1, 30h
JMP hledej

;f
acko:
JB P2.1,efko
MOV P1, 31h
JMP acko

;r
efko:
JB P2.2,rko
MOV P1, 32h
JMP efko

;O
rko:
JB P2.3,ocko
MOV P1, 33h
JMP rko

;d
ocko:
JB P2.4, decko
MOV P1, 34h
JMP ocko

;i
decko:
JB P2.5, icko
MOV P1, 35h
JMP decko

;t
icko:
JB P2.6, tecko
MOV P1, 36h
JMP icko

;A
tecko:
JB P2.7, hledej
MOV P1, 30h
JMP tecko

