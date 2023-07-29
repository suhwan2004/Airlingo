package com.ssafy.airlingo.global.openvidu;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;

@Service
public class OpenViduManager {
	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openVidu;

	@PostConstruct
	public void init() {
		this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	// 매칭이 완료되면 OpenVidu의 sessionId를 반환하는 메서드
	public String createSession() throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = new SessionProperties.Builder().build();
		Session session = openVidu.createSession(properties);
		return session.getSessionId();
	}
}
