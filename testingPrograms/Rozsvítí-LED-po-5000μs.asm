;po 5000us zmìn stav LED
MOV TMOD, #00010000b
;nastaveny CT1 na èasovaè v modu 1
SETB TR1
dokola:
MOV TH1,#0ECh
MOV TL1, #82h
JNB TF1,$
CLR TF1

JB P1.0, rozsvit
MOV P1,#255
JMP dokola
rozsvit:
MOV P1,#0
JMP dokola
