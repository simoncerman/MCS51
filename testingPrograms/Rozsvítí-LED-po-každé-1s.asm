;po 5000us zmìn stav LED
MOV TMOD, #00010000b
;nastaveny CT1 na èasovaè v modu 1
SETB TR1
;start èasování
dokola:
MOV TH1,#0BDh
MOV TL1, #0CEh
MOV R5,#16	;15+1
znovu:
JNB TF1,$
;dokud 0, zùstaò na místì
CLR TF1
DJNZ R5, znovu
NOP
JB P1.0, rozsvit
MOV P1,#255
JMP dokola
rozsvit:
MOV P1,#0
JMP dokola
