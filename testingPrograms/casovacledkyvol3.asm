;po 5000ms rozsvitit led


MOV TMOD,#00010000b
;nastaven� CT1 na �asova� v modu 1
SETB TR1 ;zapnut� �asova�e

dokola:
MOV TL1, #0CEh
MOV TH1, #0BDh
MOV R5, #16;15+1
znovu:
JNB TF1,$
CLR TF1
DJNZ R5, znovu
NOP
JB P1.0, rozsvit
MOV P1, #255
JMP dokola

rozsvit:
MOV P1,#00000000b
JMP dokola

