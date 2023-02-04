;Sestavte program, kter� bude 
;celo��seln� d�lit dlouh� ��slo 
;��slem dvoucifern�m v BCD. Zad�n� 
;bude zaps�no na adres�ch 30h-35h a 
;37h, celkov� v�sledek vypi�te na 
;adresy od 39h, zbytek po 
;celo��seln�m d�len� vypi�te na 
;adresu 3Fh. D�litel nebude vy��� 
;ne� 25. Na ostatn� adresy si 
;pochopiteln� m��ete d�lat 
;meziv�po�ty. V zad�n� i v�sledku 
;budou ��sla zaps�na tak, aby se 
;dala p�e��st bez �prav, tak�e 
;t�eba NEbude ve v�sledku v ka�d�m 
;bytu jedna cifra, ale cifry budou 
;pospojovan� po dvou do bytu.

;d�lenec
MOV 30h, #37h
MOV 31h, #92h
MOV 32h, #04h
MOV 33h, #51h
MOV 34h, #62h
MOV 35h, #17h
;d�litel
MOV 37h, #19h
;rozd�len� d�lence na cifry
CALL rozdel
CALL delitelDoHexa
MOV R0, 40h
MOV A, @R0
test:
MOV R7,A
CLR C
SUBB A, 4Fh
JNC staci
INC R0
MOV A,R7
MOV B,#10
MUL AB
ADD AB, @R0
JMP test

staci:
JMP $

rozdel:
		MOV R0, 30h;ukazuje na zad�n�
		MOV R1, 40h;ukazuje na v�stup
	dokola:
		MOV A,@R0
		MOV B,#10h
		DIV AB
		MOV @R1, A
		INC R1
		MOV @R1,B
		INC R0
		INC R1
	CJNE R0, #36h, dokola
RET

delitelDoHexa:
	MOV A, 37h
	MOV B,#10h
	DIV AB
	MOV R7,B
	MOV B,#10
	MUL AB
	ADD A, R7
	MOV 4Fh,A 
RET