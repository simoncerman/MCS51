;po 5000ms rozsvitit led

MOV TL1, #80h
MOV TH1, #0ECh
MOV TMOD,#00010000b
;nastaven� CT1 na �asova� v modu 1
SETB TR1 ;zapnut� �asova�e

JNB TF1,$

NOP ;NIC NEDELEJ
MOV P1,#00000000b

