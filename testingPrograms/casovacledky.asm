;po 5000ms rozsvitit led

MOV TL1, #80h
MOV TH1, #0ECh
MOV TMOD,#00010000b
;nastavený CT1 na èasovaè v modu 1
SETB TR1 ;zapnutí èasovaèe

JNB TF1,$

NOP ;NIC NEDELEJ
MOV P1,#00000000b

