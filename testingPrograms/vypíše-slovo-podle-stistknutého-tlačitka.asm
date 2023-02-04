;do pamìti na 3 øádky uložte
;1 slovu a vypisujte na 7 segment
;na základì stisknutého tlaèítka

MOV 30h,#11000111b ;L
MOV 31h,#10001000b ;A
MOV 32h,#10010010b ;S
MOV 33h,#11000000b ;O

MOV 40h,#10001001b ;H
MOV 41h,#11000001b ;U
MOV 42h,#10010010b ;S
MOV 43h,#10001000b ;A

       
MOV 50h,#10001100b ;P
MOV 51h,#10000110b ;E
MOV 52h,#10101111b ;r
MOV 53h,#11000000b ;O

dokola:
MOV R0, #30h
JNB P2.1,pis
MOV R0, #40h
JNB P2.2,pis
MOV R0, #50h
JNB P2.3,pis
MOV P1,#255
JMP dokola

pis:
MOV R5,#4
zobraz:
MOV P1,@R0
INC R0
DJNZ R5, zobraz
JMP dokola