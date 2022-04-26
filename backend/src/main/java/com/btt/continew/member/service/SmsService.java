package com.btt.continew.member.service;

import java.util.HashMap;
import java.util.Random;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final String apiPhoneNumber;
    private final Message coolSMS;

    public SmsService(@Value("${oauth.coolsms.api-key}") String apiKey,
        @Value("${oauth.coolsms.api-secret}") String apiSecret,
        @Value("${oauth.coolsms.api-phone-number}") String apiPhoneNumber) {
        this.apiPhoneNumber = apiPhoneNumber;
        this.coolSMS = new Message(apiKey, apiSecret);
    }

    public void sendCertifiedCode(String phoneNumber, String randomNumber) {
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);
        params.put("from", apiPhoneNumber);
        params.put("type", "SMS");
        params.put("text", "[contiNew] 인증 번호는 " + randomNumber + "입니다. (대소문자 구분필요)");
        params.put("app_version", "contiNew"); // application name and version

        try {
            coolSMS.send(params);
        } catch (CoolsmsException e) {
            e.printStackTrace();
        }
    }

    public String randomCode() {
        StringBuilder temp = new StringBuilder();

        Random rnd = new Random();
        for (int i = 0; i < 6; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
                case 0:
                    temp.append((char) (rnd.nextInt(26) + 97));
                    break;
                case 1:
                    temp.append((char) (rnd.nextInt(26) + 65));
                    break;
                case 2:
                    temp.append(rnd.nextInt(10));
                    break;
            }
        }

        return temp.toString();
    }

}
