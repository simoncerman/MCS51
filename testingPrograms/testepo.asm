MOV R4,#3

MOV 30h,#10001000b ;A
MOV 31h,#10001110b ;f
MOV 32h,#10101111b ;r
MOV 33h,#11000000b ;O
MOV 34h,#10100001b ;d
MOV 35h,#11111001b ;i
MOV 36h,#10000111b ;t
MOV 37h,#10001000b ;A

toc:
MOV R0, #30h
MOV R5, #8

dokola:
MOV P1, @R0
INC R0
DJNZ R5, dokola 
MOV P1, #11111111b
DJNZ R4, toc

toceni:
JB P2.0, jedna 
MOV P1, 30h
JMP toceni 

jedna:
JB P2.1, dva
MOV P1, 31h
JMP jedna

dva:
JB P2.2, tri
MOV P1, 32h
JMP dva

tri:
JB P2.3, ctyri
MOV P1, 33h
JMP tri

ctyri:
JB P2.4, pet
MOV P1, 34h
JMP ctyri

pet:
JB P2.5, sest
MOV P1, 35h
JMP pet

sest:
JB P2.6, sedm
MOV P1,36h
JMP sest

sedm:
JB P2.7, toceni
MOV P1,37h
JMP sedm
