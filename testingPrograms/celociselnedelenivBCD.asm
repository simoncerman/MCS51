;Sestavte program, který bude 
;celoèíselnì dìlit dlouhé èíslo 
;èíslem dvouciferným v BCD. Zadání 
;bude zapsáno na adresách 30h-35h a 
;37h, celkový výsledek vypište na 
;adresy od 39h, zbytek po 
;celoèíselném dìlení vypište na 
;adresu 3Fh. Dìlitel nebude vyšší 
;než 25. Na ostatní adresy si 
;pochopitelnì mùžete dìlat 
;mezivýpoèty. V zadání i výsledku 
;budou èísla zapsána tak, aby se 
;dala pøeèíst bez úprav, takže 
;tøeba NEbude ve výsledku v každém 
;bytu jedna cifra, ale cifry budou 
;pospojované po dvou do bytu.

;dìlenec
MOV 30h, #37h
MOV 31h, #92h
MOV 32h, #04h
MOV 33h, #51h
MOV 34h, #62h
MOV 35h, #17h
;dìlitel
MOV 37h, #19h
;rozdìlení dìlence na cifry
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
		MOV R0, 30h;ukazuje na zadání
		MOV R1, 40h;ukazuje na výstup
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