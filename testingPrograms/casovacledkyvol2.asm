;po 5000ms rozsvitit led


MOV TMOD,#00010000b
;nastavený CT1 na èasovaè v modu 1
SETB TR1 ;zapnutí èasovaèe

dokola:
MOV TL1, #84h
MOV TH1, #0ECh
JNB TF1,$
CLR TF1
NOP ;NIC NEDELEJ
JB P1.0, rozsvit
MOV P1, #255
JMP dokola

rozsvit:
MOV P1,#00000000b
JMP dokola

