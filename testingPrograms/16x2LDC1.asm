; P0 - 8-bit port which will control DB0-DB7
; P1 - Controls RS, RW, E


;command mode
MOV P1, #00000000b
; clear display command
MOV P0, #00000001b
; go home command
MOV P0, #00000010b
; enable everything - cursor, blink, display
MOV P0, #00001111b
; shift cursor right
MOV P0, #00000110b
; empty pins
MOV P0, #00000000b

; data mode
MOV P1, #00000010b
; write 'A' to display
MOV P0, #01000001b
; write 'H' to display
MOV P0, #01001000b
; write 'O' to display
MOV P0, #01001111b
; write 'J' to display
MOV P0, #01001010b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; write '!' to display
MOV P0, #00100001b
; empty pins
MOV P0, #00000000b

; command mode
MOV P1, #00000000b
; shift cursor right - new line
MOV P0, #00010100b





; data mode switch
MOV P1, #00000010b

; write 'H' to display
MOV P0, #01001000b
