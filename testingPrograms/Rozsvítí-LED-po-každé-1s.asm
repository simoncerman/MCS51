;po 5000us zm�n stav LED
MOV TMOD, #00010000b
;nastaveny CT1 na �asova� v modu 1
SETB TR1
;start �asov�n�
dokola:
MOV TH1,#0BDh
MOV TL1, #0CEh
MOV R5,#16	;15+1
znovu:
JNB TF1,$
;dokud 0, z�sta� na m�st�
CLR TF1
DJNZ R5, znovu
NOP
JB P1.0, rozsvit
MOV P1,#255
JMP dokola
rozsvit:
MOV P1,#0
JMP dokola
